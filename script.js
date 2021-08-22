document
  .querySelector(".container-rect")
  .classList.add("animated", "bounceInUp");

{
  const { locCity: city = "palmerston north", locCountry: country = "nz" } =
    localStorage;

  const key = "15dac795069e9f6ef5b3c4c435136247";
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${key}`;

  {
    const getWeather = async () => {
      const { main, name, weather } = await (await fetch(apiurl)).json();
      const tempK = main.temp;

      let tempConverted = Math.round(tempK - 273.15);

      const weatherEl = document.getElementById("weather");
      weatherEl.innerHTML = "";
      weatherEl.innerText = `${name}: ${tempConverted}°C, ${weather[0].main}`;
    };
    getWeather();
  }
}

{
  const affixes = {
    one: "st",
    two: "nd",
    few: "rd",
    other: "th",
  };

  const date = new Date();

  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    date
  );
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date
  );
  const day = new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(date);
  const year = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(
    date
  );
  const affix =
    affixes[new Intl.PluralRules("en", { type: "ordinal" }).select(+day)];

  document.getElementById(
    "month-date"
  ).innerHTML = `${weekday} ${month} ${day}<sup>${affix}</sup> ${year}`;
}

{
  const price = async () => {
    const currency = "NZD";
    const apiurl = `https://api.coinstats.app/public/v1/coins/ethereum?currency=${currency}`;

    const data = await (await fetch(apiurl)).json();
    const price = Math.round(data.coin.price);

    document.getElementById(
      "price"
    ).innerHTML = `ETH Price: ${price} ${currency}`;
  };
  price();
}

{
  const subreddit = "worldnews";
  const apiurl = `https://www.reddit.com/r/${subreddit}/.json?`;
  let postNum = 1;

  const updatepost = async () => {
    const data = await (await fetch(apiurl)).json();
    const { title, score, permalink } = data.data.children[postNum].data;

    document.getElementById("news-title").innerHTML =
      title.length > 100 ? `${title.substr(0, 70)}...` : title;
    document.getElementById(
      "score-3"
    ).innerHTML = `<i class="fa fa-heart"></i> ${score}`;
    document.getElementById(
      "news-title-link"
    ).href = `https://reddit.com${permalink}`;
  };
  updatepost();

  document.getElementById("next-post-news").addEventListener("click", () => {
    postNum++;
    updatepost();
  });
}
