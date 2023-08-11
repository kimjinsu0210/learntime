import { supabase } from "api/supabaseClient";
import Button from "components/button/Button";
import { useDialog } from "components/overlay/dialog/Dialog.hooks";
import { useModal } from "components/overlay/modal/Modal.hooks";
import useInput from "hooks/useInput";

interface Props {
  categoryId: string | undefined;
}

const PostForm = ({ categoryId }: Props) => {
  const { unmount } = useModal();
  const { Alert } = useDialog();
  const [title, handleChangeTitle] = useInput();
  const [link, handleChangeLink] = useInput();
  const [contents, handleChangeContents] = useInput();

  const handleCancel = () => {
    unmount("post");
  };

  const handlePost = async () => {
    await supabase.from("posts").insert({ title, link, contents, categoryId });
    await Alert("작성완료");
    unmount("post");
  };

  return (
    <div className="flex flex-col items-center gap-5 px-4 py-1">
      <div className="flex justify-center">
        <label>강의 노트</label>
      </div>
      <div className="flex flex-col gap-4">
        {/* <label htmlFor="title">제목:</label> */}
        <input
          value={title}
          placeholder=" 제목"
          onChange={handleChangeTitle}
          className="text-black w-96"
          id="title"
        />

        {/* <label htmlFor="link">링크:</label> */}
        <input
          value={link}
          placeholder=" 링크"
          onChange={handleChangeLink}
          className="text-black w-96"
          id="link"
        />

        {/* <label htmlFor="contents">내용:</label> */}
        <textarea
          value={contents}
          placeholder=" 내용"
          onChange={handleChangeContents}
          className="h-24 text-black w-96"
          id="contents"
        />
      </div>
      <div>
        <Button onClick={handlePost}>저장</Button>
        <Button onClick={handleCancel}>취소</Button>
      </div>
    </div>
  );
};

export default PostForm;
