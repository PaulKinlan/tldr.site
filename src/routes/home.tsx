import { batch, useSignal } from "@preact/signals";

export function SearchResults(props) {
  const { items } = props;

  return ( 
    <ul>
      {items.value.map((item) => (<li><a href={item.link}>{item.title}</a> &mdash; <span>{item.snippet}</span></li>))}
    </ul>
  ); 
}

export function Home() {

  const summary = useSignal("");
  const searchResults = useSignal({});
  const noResultClass = useSignal("hidden");
  const query = useSignal("");

  const onInput = (event) => (query.value = event.target.value);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/run?q=${query.value}`);
      const data = await response.json();
      const { outputs } = data; // outputs[0] is the search results, outputs[1] is the result

      if (outputs.length > 0) {
        batch(() => {
          searchResults.value = outputs[0].items;
          summary.value = outputs[1].text;
        });
        noResultClass.value = "visible";
      }
      else {
        summary.value = "No data found";
      }
    } catch (error) {
      summary.value = error;
    }
  };

  return (
    <>
      <section class="query">
        <h1>TL;DR</h1>
        <p>Summarize the search results.</p>
        <form onSubmit={onSubmit}>
          <input type="search" value={query} onInput={onInput} placeholder="Enter a topic" />
          <button type="submit">Go</button>
        </form>
      </section>
      <section class="result">
        <div className={noResultClass}>{summary}
          <details>
            <summary>Search Results</summary>
            <SearchResults items={searchResults}></SearchResults>
          </details>
        </div>

      </section>
    </>
  )
}
