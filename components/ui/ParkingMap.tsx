// ParkingMap.tsx
import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import ParkingMapSvg from '../../assets/parkingMapBase.svg';
import { parkingMapStyles as styles } from '../../theme/styles';

// ===== Tipos compartidos =====
export type SpotId = 'A1' | 'A2' | 'A3';
export type SpotStatus = 'AVAILABLE' | 'OCCUPIED';
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
  { id: 'A1', x: 0.512, y: 0.06},
  { id: 'A2', x: 0.67, y: 0.06 },
  { id: 'A3', x: 0.827, y: 0.056 },
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
          const occupied = spotsStatus[spot.id] === 'OCCUPIED';
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
                  backgroundColor: occupied ? '#EF4444' : '#22C55E',
                },
              ]}
            />
          );
        })}
    </View>
  );
}
