{ pkgs, ... }: {
packages = [
    pkgs.docker
    pkgs.sudo
];
services.docker.enable = true;
}