import axiosInstance from "../services/axiosInstance";

export const fetchInfo = async () => {
  try {
    const res = await axiosInstance.get("/info");
    console.log("fetchInfo response:", res.data);
    return res.data;
  } catch (error) {
    console.error("fetchInfo error:", error);
    throw error;
  }
};

export const loginRequest = async (email, password) => {
  try {
    const res = await axiosInstance.post("/login", { email, password });
    console.log("loginRequest response:", res.data);
    return res.data;
  } catch (error) {
    console.error("loginRequest error:", error);
    throw error;
  }
};

export const fetchProfile = async () => {
  try {
    const res = await axiosInstance.get("/profile");
    console.log("fetchProfile response:", res.data);
    return res.data;
  } catch (error) {
    console.error("fetchProfile error:", error);
    throw error;
  }
};

export const fetchAuthor = async (signal) => {
  try {
    const res = await axiosInstance.get("/author", { signal });
    console.log("fetchAuthor response:", res.data);
    return res.data;
  } catch (error) {
    console.error("fetchAuthor error:", error);
    throw error;
  }
};

export const fetchQuote = async (authorId, signal) => {
  console.log("Fetching quote for authorId:", authorId);
  try {
    const res = await axiosInstance.get(`/quote?authorId=${authorId}`, {
      signal,
    });
    console.log("fetchQuote response:", res.data);

    if (res.data && res.data.quote) {
      return res.data.quote;
    } else {
      console.error("Нет цитаты в ответе", res.data);
      return null;
    }
  } catch (error) {
    console.error("fetchQuote error:", error);
    throw error;
  }
};

export const logoutRequest = async () => {
  try {
    const res = await axiosInstance.delete("/logout");
    console.log("logoutRequest response:", res.data);
    return res.data;
  } catch (error) {
    console.error("logoutRequest error:", error);
    throw error;
  }
};
