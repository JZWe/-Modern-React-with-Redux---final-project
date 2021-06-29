import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamEdit = ({ fetchStream, editStream, stream, match }) => {
  useEffect(() => {
    fetchStream(match.params.id);
  }, []);

  if (!stream) {
    return <div>Loading...</div>;
  }

  const { title, description } = stream;

  const onSubmit = (formValues) => {
    // 因為有傳 StreamEdit 的 onSubmit 到 StreamForm 的關係 formValues 會是從 streamForm 傳過來的
    // 不然沒傳事件的話，console.log(formValues) 的結果會是 undefined => 因為這裡的元件沒有用 reduxForm
    editStream(match.params.id, formValues);
  };

  // 如果 initialValues={stream} 的話
  // 會傳進整個 stream 物件到 streamForm
  // 而我們要修改的只有 title 跟 description 屬性
  // 如果傳到別的屬性，之後又修改到的話，可能會有非預期的錯誤
  return (
    <div>
      <h3>Edit a Stream</h3>
      <StreamForm initialValues={{ title, description }} onSubmit={onSubmit} />
      {stream.title}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, {
  fetchStream,
  editStream,
})(StreamEdit);
