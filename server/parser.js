var email=require('./email');
var a={ Labels:
   [ { Name: 'Apparel',
       Confidence: 93.68070983886719,
       Instances: [],
       Parents: [] },
     { Name: 'Clothing',
       Confidence: 93.68070983886719,
       Instances: [],
       Parents: [] },
     { Name: 'Person',
       Confidence: 85.15693664550781,
       Instances: [Array],
       Parents: [] },
     { Name: 'Human',
       Confidence: 85.15693664550781,
       Instances: [],
       Parents: [] } ],
  LabelModelVersion: '2.0' };
console.log(a.Labels);

for(var i=0; i<a.Labels.length;i++){
	if(a.Labels[i].Name==="Human"){
	email.sendemail();
	}
}