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
  const navigate = useNavigate();
  useAuth({
    failure: "signup",
  });

  useEffect(() => {
    setLoading(true);
    const userDetails = localStorage.getItem("userDetails");
    if (!userDetails) {
      navigate("/signup");
      return;
    }
    const token = JSON.parse(userDetails).token;
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          authorization: `Bearer ${token}`,
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
  const navigate = useNavigate();
  useAuth({
    failure: "signup",
  });

  useEffect(() => {
    setLoading(true);
    const userDetails = localStorage.getItem("userDetails");
    if (!userDetails) {
      setLoading(false);
      navigate("/signup");
      return;
    }
    const token = JSON.parse(userDetails).token;
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
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

export const useAuth = ({
  success,
  failure,
}: {
  success?: string;
  failure?: string;
}) => {
  const [authLoading, setAuthLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setAuthLoading(true);
    const userDetails = localStorage.getItem("userDetails");
    if (!userDetails) {
      setAuthLoading(false);
      if (failure) {
        navigate(`/${failure}`);
      }
      return;
    }
    const token = JSON.parse(userDetails).token;
    axios
      .get(`${BACKEND_URL}/api/v1/user/me`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setAuthLoading(false);
        if (success) {
          navigate(`/${success}`);
        }
      })
      .catch((error) => {
        // alert(error);
        console.error(error);
        setAuthLoading(false);
        if (failure) {
          navigate(`/${failure}`);
        }
      });
  }, []);

  return {
    authLoading,
  };
};
