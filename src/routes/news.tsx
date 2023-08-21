import { batch, useSignal } from "@preact/signals";
import { useRef } from "preact/hooks";

export function NewsResults(props) {
  const { items } = props;

  return (
    <ul>
      {items.value.map((item) => (<li><a href={item.link[0]['$t']}>{item.title[0]['$t']}</a></li>))}
    </ul>
  );
}

export function News() {

  const input = useRef(null);
  const summary = useSignal("");
  const searchResults = useSignal([]);
  const noResultClass = useSignal("hidden");

  const onSubmit = async (event) => {
    event.preventDefault();

    const queryValue = input.current.value;

    try {
      const response = await fetch(`/api/news?q=${queryValue}`);
      const data = await response.json();
      const { outputs } = data; // outputs[0] is the search results, outputs[1] is the result

      if (outputs.length > 0) {
        batch(() => {
          searchResults.value = outputs[0].json[1].rss.channel[0].item;
          summary.value = outputs[1].text;
        });
        noResultClass.value = "visible";
      }
      else {
        summary.value = "No data found";
      }
    } catch (error) {
      summary.value = error as string;
    }
  };

  return (
    <>
      <section class="query">
        <h1>TL;DR</h1>
        <p>Summarize the news results.</p>
        <form onSubmit={onSubmit}>
          <input type="search" ref={input} placeholder="Enter a topic" />
          <button type="submit">Go</button>
        </form>
      </section>
      <section class="result">
        <div className={noResultClass}>{summary}
          <details>
            <summary>News Results</summary>
            <NewsResults items={searchResults}></NewsResults>
          </details>
        </div>

      </section>
    </>
  )
}
