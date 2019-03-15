import React, { Component } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import LaddaBtn, { ZOOM_IN } from "react-ladda";
import { createForm } from "rc-form";

import Fontawesome from "@fortawesome/react-fontawesome";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";
import faEye from "@fortawesome/fontawesome-free-solid/faEye";
import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";

import "./Gallery.scss";

import api from "../api";
import Actions from "../actions/assets";
import Loader from "./Loader";

import Pagination from "./Pagination";

import config from '../config';

const IMAGE =
  process.env.NODE_ENV === 'development'
    ? config.image.development
    : config.image.production;

const formatBytes = (a, b) => {
  if (0 === a) return "0 Bytes";
  var c = 1024,
    d = b || 2,
    e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    f = Math.floor(Math.log(a) / Math.log(c));
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
};

@connect(
  null,
  {
    upload: Actions.insert,
    removeFromDB: Actions.remove
  }
)

class S3Gallery extends Component {
  state = {
    currentTab: 0,
    files: [],
    list: null,
    selected: new Map(),
    q: "",
    page: 1,
    pages: 1,
    total: 0
  };

  componentWillMount() {
    this._refresh();
  }

  componentDidMount() {
    const { files } = this.state;
    console.log("files: ", files);
  }

  _search = () => {
    this.props.form.validateFields(async (e, form) => {
      if (!e) {
        const { page } = this.state;
        this.setState(form);
        this._refresh(page, form.q);
      }
    });
  };

  _refresh = async (page = 1, q = "") => {
    this.setState({ loading: true });

    try {
      const res = await api.assets.find({
        type: "image",
        q,
        page
      });
      const { page: tmpPage, pages, total } = res.data;
      this.setState({ list: res.data.docs, page: tmpPage, pages, total });
    } catch (e) {
      console.log("CUSTOM ERROR: ", e, JSON.stringify(e));
    }
    this.setState({ loading: false });
  };

  _upload = async e => {
    e.preventDefault();
    const { files } = this.state;
    if (files.length > 0) {
      this.setState({ loading: true });
      const { fileType } = this.props;
      try {
        let promise = [];
        files.forEach(f => {
          let formData = new FormData();
          formData.append("file", f.file);
          formData.append("type", fileType ? fileType : "image");
          promise.push(this.props.upload(formData));
        });
        await Promise.all(promise);
        toast.success("Successfully");
        this._refresh();
        this.setState({ files: [], currentTab: 0 });
      } catch (e) {
        console.log("CUSTOM ERROR: ", e);
      }
      this.setState({ loading: false });
    }
  };

  _isSelected = id => {
    const { selected } = this.state;
    if (selected.has(id)) {
      return selected.get(id);
    }
    return null;
  };

  _add = asset => {
    const { single } = this.props;
    let { selected } = this.state;
    const isSelected = this._isSelected(asset._id);

    if (single) {
      if (isSelected) {
        selected.delete(isSelected._id);
      } else {
        selected = new Map();
        selected.set(asset._id, asset);
      }
    } else {
      if (isSelected) {
        selected.delete(isSelected._id);
      } else {
        selected.set(asset._id, asset);
      }
    }

    this.setState({ selected });
  };

  _view = URL => {
    const image = new Image();
    image.src = URL;

    const w = window.open("");
    w.document.write(
      `<style>body { background: #000; display: flex; align-items: center; justify-content: center; } </style>${
        image.outerHTML
      }`
    );
  };

  _remove = index => {
    if (window.confirm("Are you sure ?")) {
      let { files } = this.state;
      files.splice(index, 1);
      this.setState({ files });
    }
  };

  _setTab = id => {
    this.setState({ currentTab: id });
  };

  _saveFiles = inputFiles => {
    const { files } = this.state;
    const { fileType } = this.props;

    for (let i = 0; i < inputFiles.length; i++) {
      let file = inputFiles[i];
      let imageType = /image.*/;
      if (fileType === "image" && !file.type.match(imageType)) {
        continue;
      }

      let reader = new FileReader();
      reader.onloadend = () => {
        files.push({
          file: file,
          preview: reader.result
        });
        this.setState({ files });
      };
      reader.readAsDataURL(file);
    }
  };

  _inputFiles = e => {
    e.preventDefault();
    let inputFiles = e.target.files;
    this._saveFiles(inputFiles);
  };

  _drop = e => {
    e.preventDefault();
    const inputFiles = e.dataTransfer.files;
    this._saveFiles(inputFiles);
  };

  _dragOver = e => {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  _dragLeave = e => {
    e.preventDefault();
  };

  renderUploader = () => {
    const { files } = this.state;
    const hasFiles = files.length > 0;
    const { fileType } = this.props;
    return (
      <div
        className={`s3-gallery-uploader ${hasFiles ? "has-files" : ""}`}
        onDrop={this._drop}
        onDragOver={this._dragOver}
        onDragLeave={this._dragLeave}
      >
        {
          files.length > 0 ? (
            <div className="s3-gallery-uploader-files">
                <div className="files-item header">
                  <div className="item-thumbnail" />
                  <div className="item-name">Name</div>
                  <div className="item-type">Type</div>
                  <div className="item-size">Size</div>
                  <div className="item-action">Actions</div>
                </div>
                {
                  files.map(({ file, preview }, index) => (
                    <div className="files-item" key={ `file-${ index }` }>
                      <div className="item-thumbnail">
                        <img src={preview} alt={ file.name } />
                      </div>
                      <div className="item-name">{ file.name }</div>
                      <div className="item-type">{ file.type }</div>
                      <div className="item-size">
                        { formatBytes(file.size) }
                      </div>
                      <div className="item-action">
                        <div
                          className="action-item"
                          onClick={() => {
                            this._view(preview);
                          }}
                        >
                          <Fontawesome icon={faEye} />
                        </div>
                        <div
                          className="action-item"
                          onClick={() => this._remove(index)}
                        >
                          <Fontawesome icon={faTimes} />
                        </div>
                      </div>
                    </div>
                  ))
                }
            </div>
          ) : (
            <div className="s3-gallery-uploader-input">
              Drag files here
              <span className="or">- or -</span>
              <span className="btn-upload">
                Select files from your computer
                <input
                  type="file"
                  multiple
                  accept={
                    fileType && fileType === "image"
                      ? "image/*"
                      : "*"
                  }
                  onChange={this._inputFiles}
                />
              </span>
            </div>
          )
        }
      </div>
    );
  };

  _removeFromDB = async (e, id, index) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this item ?")) {
      const { list } = this.state;
      list.splice(index, 1);
      this.setState({ list });
      try {
        await this.props.removeFromDB({ id });
        this._refresh();
      } catch (e) {
        console.error("CUSTOM ERROR: ", e);
      }
    }
  };

  renderFiles = () => {
    const { list, page, pages, total, q } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="file-lists">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-4">
            <div className="form-group">
              <div className="input-group">
                {
                  getFieldDecorator("q", {
                    rules: []
                  })(
                    <input
                      placeholder="Search ..."
                      className="form-control"
                      onKeyPress={e => {
                        if (e.key === "Enter") {
                          this._search();
                        }
                      }}
                    />
                  )
                }
                <button
                  className="btn btn-primary"
                  onClick={() => this._search()}
                >
                  <Fontawesome icon={faSearch} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="gallery-scroll">
          <div className="row">
            {
              list && list.length === 0 && (
                <p className="text-center text-muted">No files!</p>
              )
            }
            {
              list ? (
                list.map((image, index) => {
                  const isSelected = this._isSelected(image._id);
                  return (
                    <div className="col-xs-6 col-sm-3 col-md-2" key={ `list-${ index }` }>
                      <div
                        className={ `thumbnail ${
                          isSelected !== null
                            ? "active"
                            : ""
                        }` }
                        key={`list-image-${index}`}
                        onClick={() => this._add(image)}
                      >
                        <div
                          className="remove-action"
                          onClick={e =>
                            this._removeFromDB(
                              e,
                              image._id,
                              index
                            )
                          }
                        >
                          <Fontawesome icon={faTimes} />
                        </div>
                        <div className="thumbnail-src">
                          {
                            image.fileType === "image" ? (
                              <img
                                src={ IMAGE + image.fileUrl }
                                alt=""
                              />
                            ) : (
                              <video
                                width="100%"
                                controls
                                muted
                              >
                                <source
                                  src={ IMAGE + image.fileUrl }
                                  type="video/mp4"
                                />
                                Your browser does not
                                support HTML5 video.
                              </video>
                            )
                          }
                        </div>
                        <div className="thumbnail-name">
                          {
                            image.displayName
                              ? image.displayName
                              : image.fileName
                          }
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-xs-12 text-center">
                  <Loader />
                </div>
              )
            }
          </div>
        </div>
        <Pagination
          page={page}
          total={total}
          pages={pages}
          onClick={page => {
            this.setState({ page });
            this._refresh(page, q);
          }}
        />
      </div>
    );
  };

  render() {
    const { currentTab } = this.state;
    const contents = [this.renderFiles(), this.renderUploader()];
    return (
      <div className="s3-gallery">
        <div className="s3-gallery-tab">
          <button
            className={ `s3-gallery-tab-btn ${
              currentTab === 0 ? "active" : ""
            }` }
            onClick={ () => this._setTab(0) }
          >
            Files
          </button>
          <button
            className={`s3-gallery-tab-btn ${
              currentTab === 1 ? "active" : ""
            }`}
            onClick={() => this._setTab(1)}
          >
            Upload
          </button>
        </div>
        <div className="s3-gallery-content">{ contents[currentTab] }</div>
        {
          (this.props.onChange || currentTab === 1) && (
            <div className="s3-gallery-footer">
              <LaddaBtn
                className={`s3-btn primary ${
                  [...this.state.selected.keys()].length > 0 ||
                  currentTab === 1
                      ? ""
                      : "disabled"
                }`}
                onClick={e => {
                  const { selected } = this.state;
                  if (currentTab === 0) {
                    const keys = [...selected.keys()];
                    const tmp = keys.map(k => selected.get(k));
                    this.props.onChange &&
                      this.props.onChange(
                        this.props.single &&
                            tmp.length === 1
                            ? tmp[0]
                            : tmp
                      );
                  } else {
                    this._upload(e);
                  }
                }}
                data-style={ZOOM_IN}
                loading={this.state.loading}
              >
                {currentTab === 0 ? "Insert" : "Upload"}
              </LaddaBtn>
              <div
                className="s3-btn"
                onClick={() =>
                  this.props.close
                    ? this.props.close()
                    : this._setTab(0)
                }
                type="button"
              >
                Cancel
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default createForm()(S3Gallery);
