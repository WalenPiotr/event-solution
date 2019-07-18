IMAGE=walenpiotr/events-solution-client

VERSION=$(shell cat VERSION)

build:
	npm run build /
	docker build -t $(IMAGE):$(VERSION) .

push:
	docker push $(IMAGE):$(VERSION)

release: build push