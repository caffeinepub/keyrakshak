import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "@tanstack/react-router";
import { MapPin, Play, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  useGetLocationByKeyId,
  useTrackingSession,
  useUpdateLocation,
} from "../hooks/use-tracking";

interface Coords {
  lat: number;
  lon: number;
}

export default function TrackingPage() {
  const { keyId } = useParams({ from: "/track/$keyId" });
  const sessionId = useTrackingSession();
  const updateLocation = useUpdateLocation();

  const [tracking, setTracking] = useState(false);
  const [coords, setCoords] = useState<Coords | null>(null);
  const [error, setError] = useState<string | null>(null);

  const watcherRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const latestCoordsRef = useRef<Coords | null>(null);
  const mutateFnRef = useRef(updateLocation.mutate);
  mutateFnRef.current = updateLocation.mutate;

  const { data: liveLocation } = useGetLocationByKeyId(keyId);

  useEffect(() => {
    if (tracking) {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser.");
        setTracking(false);
        return;
      }

      watcherRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const newCoords: Coords = {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          };
          setCoords(newCoords);
          latestCoordsRef.current = newCoords;
          setError(null);
        },
        (err) => {
          setError(`Location error: ${err.message}`);
        },
        { enableHighAccuracy: true },
      );

      intervalRef.current = setInterval(() => {
        const c = latestCoordsRef.current;
        if (c) {
          mutateFnRef.current({ sessionId, keyId, lat: c.lat, lon: c.lon });
        }
      }, 5000);
    } else {
      if (watcherRef.current !== null) {
        navigator.geolocation.clearWatch(watcherRef.current);
        watcherRef.current = null;
      }
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (watcherRef.current !== null) {
        navigator.geolocation.clearWatch(watcherRef.current);
      }
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [tracking, sessionId, keyId]);

  const displayCoords = liveLocation ?? coords;

  const mapUrl = displayCoords
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${displayCoords.lon - 0.01},${displayCoords.lat - 0.01},${displayCoords.lon + 0.01},${displayCoords.lat + 0.01}&layer=mapnik&marker=${displayCoords.lat},${displayCoords.lon}`
    : null;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-md space-y-4">
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-2 mb-1">
            <MapPin className="text-primary" size={28} />
            <h1 className="text-2xl font-bold text-foreground">
              Live Tracking
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Key ID:{" "}
            <span className="font-mono font-semibold text-foreground">
              {keyId}
            </span>
          </p>
          <div className="flex justify-center mt-2">
            {tracking ? (
              <Badge
                data-ocid="tracking-status-active"
                className="bg-green-500/15 text-green-700 border-green-500/30 border"
              >
                🟢 Tracking Active
              </Badge>
            ) : (
              <Badge
                data-ocid="tracking-status-stopped"
                variant="secondary"
                className="text-muted-foreground"
              >
                ⚫ Tracking Stopped
              </Badge>
            )}
          </div>
        </div>

        {/* Controls */}
        <Card className="rounded-2xl shadow-sm border">
          <CardContent className="p-4 flex gap-3 justify-center">
            <Button
              data-ocid="btn-start-tracking"
              onClick={() => setTracking(true)}
              disabled={tracking}
              className="flex gap-2 flex-1"
            >
              <Play size={16} />
              Start Tracking
            </Button>
            <Button
              data-ocid="btn-stop-tracking"
              variant="destructive"
              onClick={() => setTracking(false)}
              disabled={!tracking}
              className="flex gap-2 flex-1"
            >
              <Square size={16} />
              Stop
            </Button>
          </CardContent>
        </Card>

        {/* Error */}
        {error && (
          <Card className="rounded-2xl border border-destructive/30 bg-destructive/5">
            <CardContent className="p-3 text-sm text-destructive">
              {error}
            </CardContent>
          </Card>
        )}

        {/* Coordinates */}
        <Card data-ocid="coords-card" className="rounded-2xl shadow-sm border">
          <CardContent className="p-4 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Current Coordinates
            </p>
            {displayCoords ? (
              <div className="font-mono text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Latitude</span>
                  <span className="font-semibold text-foreground">
                    {displayCoords.lat.toFixed(6)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Longitude</span>
                  <span className="font-semibold text-foreground">
                    {displayCoords.lon.toFixed(6)}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                {tracking
                  ? "Waiting for GPS signal..."
                  : "Start tracking to see coordinates"}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Map */}
        <Card
          data-ocid="map-card"
          className="rounded-2xl shadow-sm border overflow-hidden"
        >
          <CardContent className="p-0">
            {mapUrl ? (
              <iframe
                title="Live Location Map"
                src={mapUrl}
                width="100%"
                height="300"
                className="block border-0"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="h-48 flex flex-col items-center justify-center gap-2 bg-muted/30">
                <MapPin className="text-muted-foreground" size={32} />
                <p className="text-sm text-muted-foreground text-center px-4">
                  Map will appear once location is detected
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info */}
        <p className="text-xs text-muted-foreground text-center pb-4">
          Location updates are sent every 5 seconds while tracking is active.
          The owner can see your position in real time.
        </p>
      </div>
    </div>
  );
}
