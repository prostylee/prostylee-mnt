import axios from 'axios';

export class NodeService {
    getTreeNodes() {
        return axios.get('data/treenodes.json')
            .then(res => res.data.root);
    }

	getTreeTableNodes() {
		return axios.get('data/treetablenodes.json')
			.then(res => res.data.root);
	}
}
