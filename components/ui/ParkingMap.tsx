// ParkingMap.tsx
import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import ParkingMapSvg from '../../assets/parkingMapBase.svg';
import { parkingMapStyles as styles } from '../../theme/styles';

// ===== Tipos compartidos =====
export type SpotId = '001' | '002' | '003';
export type SpotStatus = 'available' | 'occupied' | 'blocked';
export type SpotsState = Record<SpotId, SpotStatus>;

type SpotLayout = {
  id: SpotId;
  x: number;
  y: number;
};

interface ParkingMapProps {
  spotsStatus: SpotsState;
  onSpotPress?: (id: SpotId) => void;
}

// ===== Layout de spots =====
const SPOTS_LAYOUT: SpotLayout[] = [
  { id: '001', x: 0.512, y: 0.06},
  { id: '002', x: 0.67, y: 0.06 },
  { id: '003', x: 0.827, y: 0.056 },
];

export default function ParkingMap({ spotsStatus, onSpotPress }: ParkingMapProps) {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  return (
    <View
      style={styles.wrapper}
      onLayout={e => {
        const { width, height } = e.nativeEvent.layout;
        setSize({ width, height });
      }}
    >
      <ParkingMapSvg width="100%" height="100%" />

      {size.width > 0 &&
        SPOTS_LAYOUT.map(spot => {
          const occupied = spotsStatus[spot.id] === 'occupied';
          const left = spot.x * size.width;
          const top = spot.y * size.height;

          return (
            <Pressable
              key={spot.id}
              onPress={() => onSpotPress?.(spot.id)}
              style={[
                styles.spot,
                {
                  left,
                  top,
                  backgroundColor:
                    spotsStatus[spot.id] === 'blocked'
                      ? '#5f5a64ff' 
                      : spotsStatus[spot.id] === 'occupied'
                      ? '#EF4444' 
                      : '#22C55E',
                },
              ]}
            />
          );
        })}
    </View>
  );
}
