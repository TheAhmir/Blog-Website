import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';

const QuillEditor = ({ value, onChange }) => {
  return <ReactQuill theme="snow" value={value} onChange={onChange} />;
};

export default QuillEditor;