import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Prompt } from 'react-router-dom'
import Textarea from 'react-textarea-autosize';
import { createPost } from 'actions/posts-actions';
import ModalDarken from 'components/ui/modal-darken';
import PostFormPhotos from 'components/post/post-form-photos';

const PostForm = ({postable_id = null, postable_type = 'User'}) => {
  const [body, setBody] = useState('');
  const [focus, setFocus] = useState(false);
  const container = useRef(null);
  const dispatch = useDispatch();
  postable_id = postable_id || useSelector(state => state.session.id);

  return (
    <section className={`post-form-container ${focus ? 'post-form-container-focus' : ''}`}
      ref={container} onClick={() => setFocus(true)}>
      <h3>Create Post</h3>
      <form className="post-form" onSubmit={submitPost(dispatch, body, postable_id, postable_type, setBody, setFocus)}>
        <div className="post-form-circular-image"/>
        <Textarea onChange={handleUpdate(setBody)} value={body} placeholder="What's on your mind?" />
        <Prompt when={!!body} message="You haven't finished your post yet. Do you want to leave without finishing?" />
        <PostFormPhotos />
        <fieldset className="post-form-share-button-wrapper">
          <input type="submit" value="Share" className="post-form-share-button" />
        </fieldset>
      </form>
      <ModalDarken activate={focus} deactivate={() => setFocus(false)} element={container} scrollJack={false}/>
    </section>
  );
};

const handleUpdate = (setter) => (e) => setter(e.target.value);
const submitPost = (dispatch, body, postable_id, postable_type, setBody, setFocus) => (e) => {
  e.preventDefault();
  dispatch(createPost({post: { body, postable_id, postable_type }}));
  setBody('');
  setFocus(false);
};

export default PostForm;
