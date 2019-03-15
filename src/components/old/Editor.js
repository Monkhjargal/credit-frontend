import React, { Component } from 'react';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { connect } from 'react-redux';

import Actions from '../actions/assets';

@connect(
  null,
  {
    upload: Actions.insert
  }
)
class EditorConvertToHTML extends Component {
  state = {
    editorState: EditorState.createEmpty()
  };

  componentWillMount() {
    const { value } = this.props;
    const html = value;
    const contentBlock = htmlToDraft(html ? html : '');
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);

      this.setState({ editorState });
    }
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });

    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.props.onChange(html);
  };

  _upload = async file => {
    let formData = new FormData();
    formData.append('file', file);
    const res = await this.props.upload(formData);
    return Promise.resolve({
      data: {
        link: res.data
      }
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="react-wrapper"
          editorClassName="react-editor"
          onEditorStateChange={ this.onEditorStateChange }
          toolbar={{
            image: {
              uploadCallback: this._upload
            }
          }}
        />
      </div>
    );
  }
}

export default EditorConvertToHTML;
