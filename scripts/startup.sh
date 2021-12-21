#! /usr/bin/env bash
set -ex

yarn install

cd ./packages
cp server/.env.example server/.env
cd ..

yarn update