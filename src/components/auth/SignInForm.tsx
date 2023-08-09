import { supabase } from "api/supabaseClient";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
const SignInForm = ({ unmount }: { unmount: (name: string) => void }) => {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  const signInHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword
    });

    console.log("signInData", data);
    console.log("signInError", error);
    if (error) {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    } else {
      alert("로그인 완료");
    }
  };

  return (
    <form onSubmit={signInHandler} className="p-[20px]">
      <div className="flex justify-end">
        <AiFillCloseCircle
          className="text-3xl text-red-500 cursor-pointer"
          onClick={() => unmount("signIn")}
        />
      </div>
      <div className="flex flex-col gap-4">
        <label>이메일</label>
        <input
          className="border-b border-gray-400 border-solid w-[300px] h-[35px]"
          type="text"
          value={loginEmail}
          onChange={e => {
            setLoginEmail(e.target.value);
          }}
          autoFocus
        />
        <label>비밀번호</label>
        <input
          className="border-b border-gray-400 border-solid w-[300px] h-[35px]"
          type="password"
          value={loginPassword}
          onChange={e => {
            setLoginPassword(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-end">
        <button className="p-2 mt-8 text-white bg-red-500 rounded-lg">로그인</button>
      </div>
    </form>
  );
};

export default SignInForm;