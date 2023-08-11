export function Home() {

  const result = signal("");
  const query = signal("");

  const onInput = event => (query.value = event.target.value);

  const onSubmit = async (event) => {
    event.preventDefault();

    const response = fetch(`/api/search?q=${query.value}`);
    const data = await response.json();
    const { outputs } = data;
    
    if (outputs.lengh > 0) { 
      result.value = outputs[0].text;
    }
    else {
      result.value = "No data found";
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
    );
    </>
  )
}
