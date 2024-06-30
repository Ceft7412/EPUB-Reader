import { useState, useEffect } from "react";
const quotes = [
  "“It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.” — Jane Austen",
  "“I declare after all there is no enjoyment like reading! How much sooner one tires of any thing than of a book!” — Jane Austen",
  "“The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.” — Jane Austen",
  "“To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.” — Ralph Waldo Emerson",
  "“In three words I can sum up everything I've learned about life: it goes on.” — Robert Frost",
  "“The only way to do great work is to love what you do.” — Steve Jobs",
  "“Success is not final, failure is not fatal: It is the courage to continue that counts.” — Winston Churchill",
  "“The greatest glory in living lies not in never falling, but in rising every time we fall.” — Nelson Mandela",
  "“Your time is limited, don’t waste it living someone else’s life.” — Steve Jobs",
  "“Many of life’s failures are people who did not realize how close they were to success when they gave up.” — Thomas A. Edison",
  "“If you want to live a happy life, tie it to a goal, not to people or things.” — Albert Einstein",
  "“Not all of us can do great things. But we can do small things with great love.” — Mother Teresa",
  "“The only limit to our realization of tomorrow will be our doubts of today.” — Franklin D. Roosevelt",
  "“What lies behind us and what lies before us are tiny matters compared to what lies within us.” — Ralph Waldo Emerson",
  "“The best preparation for tomorrow is doing your best today.” — H. Jackson Brown Jr.",
  "“Life is what happens when you're busy making other plans.” — John Lennon",
  "“The future belongs to those who believe in the beauty of their dreams.” — Eleanor Roosevelt",
  "“I have not failed. I've just found 10,000 ways that won't work.” — Thomas A. Edison",
  "“It does not matter how slowly you go as long as you do not stop.” — Confucius",
  "“In the end, it's not the years in your life that count. It's the life in your years.” — Abraham Lincoln",
  "“Life is really simple, but we insist on making it complicated.” — Confucius",
  "“You only live once, but if you do it right, once is enough.” — Mae West",
  "“The purpose of our lives is to be happy.” — Dalai Lama",
  "“Get busy living or get busy dying.” — Stephen King",
  "“Life is what happens when you're busy making other plans.” — John Lennon",
  "“You can't blame gravity for falling in love.” — Albert Einstein",
  "“Everyone thinks of changing the world, but no one thinks of changing himself.” — Leo Tolstoy",
  "“The only impossible journey is the one you never begin.” — Tony Robbins",
];
const Quotes = () => {
  const [quote, setQuote] = useState("");
  const [index, setIndex] = useState(Math.floor(Math.random() * quotes.length));

  useEffect(() => {
    let timer;
    if (quote.length < quotes[index].length) {
      timer = setInterval(() => {
        setQuote((prevQuote) => prevQuote + quotes[index][prevQuote.length]);
      }, 40);
    } else {
      timer = setInterval(() => {
        setQuote("");
        setIndex(Math.floor(Math.random() * quotes.length));
      }, 5000);
    }

    return () => clearInterval(timer);
  }, [index, quote]);

  return (
    <div className="card-item right">
      <h2>{quote}</h2>
    </div>
  );
};

export default Quotes;
