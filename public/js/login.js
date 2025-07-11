const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/users/login",
      data: {
        email,
        password,
      },
    });
    if (res.status === 200 || res.status === 201) {
      alert("Everything is okay");
    }
    console.log(res);
  } catch (err) {
    console.log(err.response?.data || err);
  }
};

document.querySelector(".login-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  login(email, password);
});
