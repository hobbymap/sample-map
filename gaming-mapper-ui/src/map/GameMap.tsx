import React, { useState } from 'react'; 
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; 

// Define the GameData interface
interface GameData {
    system: string;
    game: string;
    date: string;
    city: string;
    coords: [number, number];
    author: string;
    company: string;
}

// Sample data for games
const gameData: GameData[] = [
    { system: "Atari 2600", game: "Pac-Man", date: "1982-04-03", city: "Sunnyvale, CA", coords: [37.3688, -122.0363], author: "Todd Frye", company: "Atari" },
    { system: "Nintendo Entertainment System", game: "Super Mario Bros.", date: "1985-09-13", city: "Kyoto", coords: [35.0116, 135.7681], author: "Shigeru Miyamoto", company: "Nintendo" },
    { system: "PlayStation", game: "Final Fantasy VII", date: "1997-01-31", city: "Tokyo", coords: [35.6895, 139.6917], author: "Hironobu Sakaguchi", company: "Square Enix" },
    { system: "Xbox", game: "Halo: Combat Evolved", date: "2001-11-15", city: "Redmond, WA", coords: [47.6740, -122.1215], author: "Bungie", company: "Microsoft" },
    { system: "Nintendo Switch", game: "The Legend of Zelda: Breath of the Wild", date: "2017-03-03", city: "Kyoto", coords: [35.0116, 135.7681], author: "Hidemaro Fujibayashi", company: "Nintendo" },
    { system: "PlayStation 5", game: "God of War Ragnarök", date: "2022-11-09", city: "Santa Monica, CA", coords: [34.0195, -118.4912], author: "Eric Williams", company: "Santa Monica Studio" },
    { system: "PC", game: "Cyberpunk 2077", date: "2020-12-10", city: "Warsaw", coords: [52.2298, 21.0122], author: "Adam Badowski", company: "CD Projekt Red" }
];

// Create a custom icon for the markers
const createCustomIcon = (imageUrl: string) => {
    return new L.Icon({
        iconUrl: imageUrl,
        iconSize: [32, 32],  // Adjust size as needed
        iconAnchor: [16, 32],  // Position the icon at the bottom center
        popupAnchor: [0, -32], // Position the popup above the icon
    });
};
//'<a href="https://www.flaticon.com/free-icons/joystick" title="joystick icons">Joystick icons created by Good Ware - Flaticon</a>'

const GameMap: React.FC = () => {
    return (
        <MapContainer center={[43.796, -90.073]} zoom={3} style={{ height: "500px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {gameData.map((game, index) => (
                <Marker 
                    key={index} 
                    position={game.coords}
                    icon={createCustomIcon('/console.png')}  // Use the custom icon for each marker
                >
                    <Popup>
                        <strong>{game.system}</strong><br />
                        <em>{game.game}</em><br />
                        Release Date: {game.date}<br />
                        Author: {game.author}<br />
                        Company: {game.company}<br />
                        Location: {game.city}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default GameMap;