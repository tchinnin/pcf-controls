import { resourceLimits } from "worker_threads";
import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class pcf01 implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _context : ComponentFramework.Context<IInputs>;
	private a : ComponentFramework.LookupValue
	private _container: HTMLDivElement;

	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement) : void
	{
		this._context = context;
		this._container = container;

		let entityname="";
		let keyfield ="";
		let keyvalue = "";
		let valuefield = "";

		if(context.parameters.entityname.raw != null)
			entityname = context.parameters.entityname.raw;
		if(context.parameters.keyfield.raw != null)
			keyfield = context.parameters.keyfield.raw;
		if(context.parameters.keyvalue.raw != null)
			keyvalue = context.parameters.keyvalue.raw;
		if(context.parameters.valuefield.raw != null)
			valuefield = context.parameters.valuefield.raw;

		let odataQuery = "?$filter="+keyfield+" eq '"+keyvalue+"'&$select="+valuefield+"&$top=1"

		this._context.webAPI.retrieveMultipleRecords(entityname,odataQuery).then(
			function(result){
				let textToDisplay =  result.entities[0][valuefield];
				let parentDiv = document.createElement("div");
				let textSpan = document.createElement("span");
				textSpan.innerHTML =  textToDisplay;
				parentDiv.appendChild(textSpan);
				container.appendChild(parentDiv);
			}
		);	
	}


	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
	}


	public getOutputs(): IOutputs
	{
		return {};
	}

	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}

}
