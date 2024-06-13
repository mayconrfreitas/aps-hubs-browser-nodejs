import { BaseExtension } from './BaseExtension.js';

class OpenAIExtension extends BaseExtension {
	load() {
		super.load();
		console.log('OpenAIExtension loaded.');
		return true;
	}

	unload() {
		super.unload();
		console.log('OpenAIExtension unloaded.');
		return true;
	}

	async onModelLoaded(model) {
		super.onModelLoaded(model);
		const props = await this.findPropertyNames(this.viewer.model);
		console.log('New model has been loaded. Its objects contain the following properties:', props);
	}

	async onSelectionChanged(model, dbids) {
		super.onSelectionChanged(model, dbids);
		console.log('Selection has changed', dbids);
	}

	onIsolationChanged(model, dbids) {
		super.onIsolationChanged(model, dbids);
		console.log('Isolation has changed', dbids);
	}
}