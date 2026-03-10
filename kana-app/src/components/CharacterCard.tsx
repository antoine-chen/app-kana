interface CharacterCardProps {
    character: string;
    romanji: string;
}

function CharacterCard({ character, romanji }: CharacterCardProps) {
    return (
        <div className="character-card">
            <span className="kana">{character}</span>
            <span className="romanji">{romanji}</span>
        </div>
    );
}

export default CharacterCard;