async function getData() {
  try {
    const data = await fetch("https://api.github.com/users/codebudy5247");
    const res = await data.json();
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
handlePromise();
