#!/usr/bin/env bash
# Usage: scripts/encode-testimonials.sh <folder-of-raw-videos> <city-slug>
# Writes public/testimonials/<slug>-<n>.mp4 + .jpg; then add the city to
# testimonialCities in src/lib/content.ts.
set -euo pipefail

src=$1
slug=$2
out=public/testimonials
mkdir -p "$out"

i=1
while IFS= read -r f; do
  base="$out/$slug-$i"
  ffmpeg -y -v error -i "$f" \
    -vf "scale=-2:'min(1280,ih)':flags=lanczos,fps=30" \
    -c:v libx264 -preset slow -crf 26 -profile:v high -pix_fmt yuv420p \
    -c:a aac -b:a 96k -ac 2 -movflags +faststart "$base.mp4"
  d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$base.mp4")
  ffmpeg -y -v error -ss "$(echo "$d*0.3" | bc)" -i "$base.mp4" \
    -frames:v 1 -vf "scale=540:-2" -q:v 4 "$base.jpg"
  echo "$f -> $base.mp4 ($(du -h "$base.mp4" | cut -f1))"
  i=$((i + 1))
done < <(find "$src" -type f \( -iname '*.mp4' -o -iname '*.mov' \) | sort)

echo "$slug: $((i - 1)) stories"
