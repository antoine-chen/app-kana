import CharacterGrid from "./components/Charactergrid";
import { kanaData } from "./data/kana";
import "./App.css";

function App() {
    return (
        <div>
            <header className="app-header">
                <h1>Apprentissage du Japonais — <span>Kana</span></h1>
            </header>

            <main className="app-content">
                <CharacterGrid
                    title="Hiragana"
                    characters={kanaData}
                    type="hiragana"
                />
                <CharacterGrid
                    title="Katakana"
                    characters={kanaData}
                    type="katakana"
                />
            </main>
        </div>
    );
}

export default App;