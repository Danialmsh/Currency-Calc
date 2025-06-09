import {getSimpleRates} from "@/services/currencyService";
import Calculator from "@/components/Calculator";

const Home = async () => {
    const rates = await getSimpleRates();


    return (
        <Calculator rates={rates} />
    );
}
export default Home;