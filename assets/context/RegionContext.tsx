import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RegionContextType {
    selectedRegion: string;
    setSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
    selectedPeriode: string;
    setSelectedPeriode: React.Dispatch<React.SetStateAction<string>>;
}

const RegionContext = createContext<RegionContextType>({
    selectedRegion: '',
    setSelectedRegion: () => {},
    selectedPeriode: '',
    setSelectedPeriode: () => {}
});

export const useRegion = () => useContext(RegionContext);

const RegionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [selectedPeriode, setSelectedPeriode] = useState<string | null>(null);

    const fetchData = async () => {
        const periode = await AsyncStorage.getItem('periode');
        setSelectedPeriode(periode !== null ? periode : '2023-2024');

        const region = await AsyncStorage.getItem('region');
        setSelectedRegion(region !== null ? region : 'None');
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <RegionContext.Provider value={{ selectedRegion, setSelectedRegion, selectedPeriode, setSelectedPeriode }}>
            {children}
        </RegionContext.Provider>
    );
};

export default RegionProvider;