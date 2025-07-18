#!/bin/bash
# Script untuk memperbarui DNS FreeDNS untuk whoiam.soon.it dan www.whoiam.soon.it

TARGET_IP="157.66.54.194"
UPDATE_URL="https://freedns.afraid.org/dynamic/update.php?akI1UVhCTVZzWE51bkt2T2Y3Q1BoWkhoOjI0MzM0NzMz"

echo "[INFO] Updating DNS records to IP $TARGET_IP..."
RESPONSE=$(curl -s -k "$UPDATE_URL&address=$TARGET_IP")

echo "[INFO] Response from FreeDNS: $RESPONSE"
