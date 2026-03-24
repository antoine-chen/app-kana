import CharacterCard from "./CharacterCard";
import type {Kana} from "../data/kana";

interface CharacterGridProps {
    characters: Kana[];
    title: string;
    type: "hiragana" | "katakana";
}

function CharacterGrid({ characters, title, type }: CharacterGridProps) {
    return (
        <section className="character-section">
            <h2>{title}</h2>

            <div className="character-grid">
                {characters.map((kana) => (
                    <CharacterCard
                        key={kana.hiragana}
                        character={kana[type]}
                        romanji={kana.romanji}
                    />
                ))}
            </div>
        </section>
    );
}

export default CharacterGrid;