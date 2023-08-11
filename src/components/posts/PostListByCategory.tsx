import Button from "components/button/Button";
import { useModal } from "components/overlay/modal/Modal.hooks";
import PostForm from "components/posts/PostForm";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { fetchData, getCategoryId } from "./api";

export default function PostListByCategory() {
  const { mount } = useModal();
  const param = useParams();
  const paramCategoryName = param.category;

  const { data: categoryId } = useQuery({
    queryKey: ["categoryId", paramCategoryName],
    queryFn: () => getCategoryId(paramCategoryName)
  });

  const useFetchPosts = () => {
    return useQuery({
      queryKey: "postByCategory",
      queryFn: () => fetchData(),
      refetchOnWindowFocus: false
    });
  };
  const { data: PostData, error, isLoading } = useFetchPosts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;

  console.log(PostData);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-right mt-10 mb-5">
        <Button onClick={() => mount("post", <PostForm categoryId={categoryId?.uid} />)}>
          강의 노트 공유하기
        </Button>
      </div>
      <div className="bg-gray-200 rounded-lg p-6">PostListByCategory</div>
    </div>
  );
}
