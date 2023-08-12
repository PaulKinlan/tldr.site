import { signal } from "@preact/signals";

export function Home() {

  const result = signal("");
  const noResultClass = signal("hidden");
  const query = signal("");

  const onInput = event => (query.value = event.target.value);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/run?q=${query.value}`);
      const data = await response.json();
      const { outputs } = data;

      if (outputs.length > 0) {
        result.value = outputs[0].text;
        noResultClass.value = ""
      }
      else {
        result.value = "No data found";
      }
    } catch (error) {
      result.value = error;
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
        <div className={noResultClass}>{result}
          <details>
            <summary>Search Results</summary>
          </details>
        </div>

      </section>
    </>
  )
}
