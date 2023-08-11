import { supabase } from "api/supabaseClient";
import Button from "components/button/Button";
import useInput from "hooks/useInput";
import { FormEvent } from "react";
import { useParams } from "react-router";

const COMMENTS = [
  { id: "aa", contents: "asdf", createdAt: "20231210", postId: "31231", userId: "aseff" },
  { id: "aab", contents: "asdsdsf", createdAt: "20231211", postId: "31231", userId: "asefdf" },
  { id: "abc", contents: "asdhjf", createdAt: "20231211", postId: "31231", userId: "agerh" }
];

const Details = () => {
  const [comment, handleComment, setComment] = useInput();
  const params = useParams();

  type Comment = (e: FormEvent<HTMLFormElement>) => void;
  const handleSubmitComment: Comment = async e => {
    e.preventDefault();
    await supabase.from("comments").insert({ contents: comment, postId: params.id });
    setComment("");
  };
  console.log(params);

  return (
    <div>
      <div className="bg-gray-200 max-w-3xl mx-auto my-10 rounded-lg p-6 flex flex-col gap-5">
        <div className="flex items-center gap-5">
          <div className="flex justify-center items-center bg-yellow-200 w-16 h-16 rounded-full">
            <img alt="test" />
          </div>
          <div>닉네임</div>
        </div>
        <h3>제목</h3>
        <a href="https://github.com/kimjinsu0210/learntime">링크</a>
        <p>내용</p>
        <Button className="px-4 py-2 w-20 self-center m-1 w rounded-3xl transition duration-300 shadow-md text-white text-sm bg-primary hover:bg-opacity-70">
          추천 0
        </Button>
      </div>
      <ul className="mx-auto max-w-3xl flex flex-col gap-4">
        {COMMENTS.map(comment => (
          <li key={comment.id} className="flex items-center gap-3 text-white">
            <div className="flex justify-center items-center bg-yellow-200 w-8 h-8 rounded-full">
              <img alt="" />
            </div>
            <div className="flex gap-10 border-b border-white w-full pb-1">
              <div>닉네임</div>
              <p>{comment.contents}</p>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmitComment} className="flex mx-auto max-w-3xl my-10 gap-4">
        <input
          value={comment}
          onChange={handleComment}
          className="w-full bg-black rounded-3xl text-white m-1 px-4"
        />
        <Button
          type="submit"
          className="px-4 min-w-fit py-2 w-20 self-center m-1 w rounded-3xl transition duration-300 shadow-md text-white text-sm bg-primary hover:bg-opacity-70"
        >
          입력
        </Button>
      </form>
    </div>
  );
};

export default Details;
