import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

interface BlogType {
  content: string;
  title: string;
  id: number;
  author: { name: string };
}

export interface UserType {
  id: number;
  name: string;
  username: string;
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlogs(response.data.blogs);
        setLoading(false);
      })
      .catch((error) => {
        // alert(error);
        console.error(error);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState<BlogType>({
    title: "",
    content: "",
    id: 0,
    author: {
      name: "",
    },
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlog(response.data.blog);
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  }, [id]);

  return {
    loading,
    blog,
  };
};

export const useAuth = (to?: string) => {
  const [authLoading, setAuthLoading] = useState(false);
  const [user, setUser] = useState<UserType>({
    id: 0,
    name: " ",
    username: " ",
  });
  const navigate = useNavigate();
  useEffect(() => {
    setAuthLoading(true);
    axios
      .get(`${BACKEND_URL}/api/v1/user/me`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUser(response.data.user);
        setAuthLoading(false);
        if (to) {
          console.log("navigating to blogs");
          navigate(`/blogs`);
        }
      })
      .catch((error) => {
        // alert(error);
        console.error(error);
        setAuthLoading(false);
        if (!to || to == "root") {
          navigate("/signup");
        }
      });
  }, []);

  return {
    authLoading,
    user,
  };
};
