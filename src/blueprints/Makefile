TARGETS := $(wildcard blu_*.ts)

all: $(TARGETS)

blu_%.ts: ../../assets/%.gltf
	@echo "$< → $@"
	@node gltf2blu.cjs $* > $@
	@npx prettier --loglevel=silent --write $@
