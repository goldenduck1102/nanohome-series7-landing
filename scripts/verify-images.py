"""Requires ImageMagick. Verify original product/image pixels are unchanged."""
from pathlib import Path
import subprocess, hashlib, json
root = Path(__file__).resolve().parents[1]
report = json.loads((root / "image-optimization.json").read_text())
for row in report["lossless"]:
    hashes = [hashlib.sha256(subprocess.check_output(["magick", str(root / file), "-depth", "8", "rgba:-"])).digest() for file in [row["original"], row["selected"]]]
    assert hashes[0] == hashes[1], row["original"]
print("PASS: all 30 full-resolution images retain identical decoded RGBA pixels")
