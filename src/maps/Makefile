TARGETS := $(wildcard map_*.ts)

all: $(TARGETS)

map_%.ts: ../../assets/%.gltf
	@echo "$< → $@"
	@node gltf2map.cjs $* > $@
	@npx prettier --loglevel=silent --write $@
