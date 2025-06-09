const ENDPOINT = `https://brsapi.ir/Api/Market/Gold_Currency.php?key=${process.env.BRS_API_KEY}`;



export async function getSimpleRates() {
    const res = await fetch(ENDPOINT, { cache: 'no-store' });
    if (!res.ok) throw new Error('BRS API error ' + res.status);

    const raw = await res.json()

    return raw.currency;
}
