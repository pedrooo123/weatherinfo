type requestData = {
    lat: string;
    lon: string;
}

// Az alábbi függvényben valósítom meg az openweathermap API-val az időjárási adatok lekérését. Azért szerver oldalon valósítottam meg, hogy az API kulcsot biztonságosan környezeti változóként tudjam tárolni, illetve ha más oldalról is szeretnénk elérni, ezzel könnyen megtehetjük.
export async function POST(req: Request, res: Response){
    const api_key = process.env.API_KEY;
    const requestData = await req.json();
    let lat = requestData.lat;
    let lon = requestData.lon;

    // Ha nincs megadva a latitude vagy a longitude, hiba üzenet küldése
    if (!lat || !lon) {
        return Response.json({ message: "Missing input parameters" }, { status: 400 });
    }

    // Ha nem szám az adatokban szereplő érték, hiba üzenet küldése
    if (isNaN(lat) || isNaN(lon)) {
        return Response.json({ message: "The input parameters must be numbers" }, { status: 400 });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            return Response.json({ message: data.message }, { status: data.cod });
        } 

        return Response.json(data)
    } catch (error) {;
        return Response.json({ message: "Error fetching data" }, { status: 500 });
    }
}