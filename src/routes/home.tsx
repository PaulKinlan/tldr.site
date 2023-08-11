import { signal } from "@preact/signals";

export function Home() {

  const result = signal("");
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
      <h1>Hello</h1>
      <p>Summarize the search results.</p>
      <form onSubmit={onSubmit}>
        <input type="search" value={query} onInput={onInput} />
        <button type="submit">Go</button>
      </form>
      <div>
        {result}
      </div>
    </>
  )
}
