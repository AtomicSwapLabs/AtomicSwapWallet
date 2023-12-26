rm -rf build
sudo docker build -t wallet -f scripts/Dockerfile .
sudo docker create --name dummy-container wallet
sudo docker cp dummy-container:/usr/src/app/dist_electron/ .
sudo docker rm dummy-container
sudo chmod -R 777 dist_electron
mkdir -p build
mv dist_electron/*.AppImage build
rm -rf dist_electron