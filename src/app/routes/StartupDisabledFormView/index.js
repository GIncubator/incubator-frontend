import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

export default class StartupDisabledFormView extends Component {
  render() {
    const {
            name,
            founderName,
            coFounders,
            totalMemberCount,
            typeOfIncorporation,
            legalEntityName,
            legalEntityMembers,
            raisedFunds,
            expectedFund,
            registeredAddress,
            founderResidentialAddress,
            founderContactNumber,
            founderEmailAddress,
            secondaryContactName,
            secondaryContactNumber,
            secondaryEmailAddress,
            startupWebsite,
            socialMediaLinks,
            startupPAN,
            bankAccountNumber,
            bankName,
            bankIFSC,
            facilitiesNeededFromGUSEC,
            gusecPremisesAccess
    } = this.props;
    return (
      <form method="post" action="/">
      <div className="jr-card">
       <h3 className="mb-0">
           Startup and Founder Section
       </h3>
       <TextField
           type="text"
           label="Name of your startup"
           fullWidth
           defaultValue={name}
           margin="normal"
           className="mt-0 mb-2"
           disabled
       />

       <TextField
           type="text"
           label="Name of the founder"
           fullWidth
           defaultValue={founderName}
           margin="normal"
           className="mt-0 mb-2"
           disabled
       />
 
       <TextField
           type="text"
           label="Total Member Count"
           fullWidth
           defaultValue={totalMemberCount}
           margin="normal"
           className="mt-0 mb-2"
           disabled
       />
       </div>
       <div className="jr-card">
       <h3 className="mb-0">
           Details about cofounders
       </h3>
       <p className="text-muted">
       Add only cofounder and respective designation per line. If the startup has no co-founders, please specify "No co-founders" in Cofounder Name
           </p>
       {coFounders.map((f, i) => <div key={i}>
           <TextField
           type="text"
           label="Cofounder Name"
           fullWidth
           defaultValue={f.name}
           margin="normal"
           className="mt-0 mb-2"
           disabled
            />
           <TextField
           type="text"
           label="Cofounder Designation"
           fullWidth
           defaultValue={f.designation}
           margin="normal"
           className="mt-0 mb-2"
           disabled
           />
           </div>)}
           </div>

   <div className="jr-card">
   <h3 className="mb-0">
           Incorporation type and legal entities
       </h3>
       
       <TextField
           type="text"
           label="Type Of Incorporation"
           fullWidth
           value={typeOfIncorporation}
           margin="dense"
           className="mt-0 mb-2"
           disabled
       />
     
       </div>
       <div className="jr-card">
           <p className="text-muted">
           If your startup is incorporated, please state the individuals who are formally a part of the legal entity, along with their roles.
           In case of private company, mention the directors and their types, if applicable. In case of a partnership firm, mention all the partners. If your startup is not incorporated, please mention "Not incorporated yet"
           </p>
       <TextField
           type="text"
           label="Legal Entity Name"
           fullWidth
           defaultValue={legalEntityName}
           margin="normal"
           className="mt-0 mb-2"
           disabled
       />

      {legalEntityMembers.map((f, i) => <div key={i}>
           <TextField
           type="text"
           label="Legal Entity Member Name"
           fullWidth
           defaultValue={f.name}
           margin="normal"
           className="mt-0 mb-2"
           disabled
            />
           <TextField
           type="text"
           label="Legal Entity Member Designation"
           fullWidth
           defaultValue={f.designation}
           margin="normal"
           className="mt-0 mb-2"
           disabled
           />
           </div>)}
   </div>
   <div className="jr-card">
   <h3 className="mb-0">
           Funding status
       </h3>
       <p className="text-muted">
       Has your startup raised any funds. If yes, how much?
           </p>
       
       <TextField
           type="text"
           label="Raised Funds"
           fullWidth
           defaultValue={raisedFunds}
           margin="normal"
           className="mt-0 mb-2"
           disabled
       />

<p className="text-muted">
       Are you looking for funds in the next six months. If yes, how much?
           </p>
       <TextField
           type="text"
           label="Expected Fund"
           fullWidth
           defaultValue={expectedFund}
           margin="normal"
           className="mt-0 mb-2"
           disabled
       />
</div>


<div className="jr-card">
   <h3 className="mb-0">
           Addresses
       </h3>
       <p className="text-muted">
       Use the address of your legal entity. If your startup is not incorporated, please use the address that you shall be using at the time of incorporation
           </p>
       <TextField
           type="text"
           label="Registered Address"
           fullWidth
           defaultValue={registeredAddress}
           margin="normal"
           className="mt-0 mb-2"
           disabled
       />


       <TextField
           type="text"
           label="Founder Residential Address"
           fullWidth
           defaultValue={founderResidentialAddress}
           margin="normal"
           className="mt-0 mb-2"
           disabled
       />

</div>
<div className="jr-card">
   <h3 className="mb-0">
           Primary Contact Details
       </h3>
       <TextField
           type="text"
           label="Founder Contact Number"
           fullWidth
           defaultValue={founderContactNumber}
           margin="normal"
           className="mt-0 mb-2"
           disabled
       />


       <TextField
           type="text"
           label="Founder Email Address"
           fullWidth
           defaultValue={founderEmailAddress}
           margin="normal"
           className="mt-0 mb-2"
           disabled
       />
</div>
<div className="jr-card">
   <h3 className="mb-0">
           Secondary Contact Details
       </h3>
       <p className="text-muted">
       Ideally, a co-founder or a partner or a director. Please don't enter details of an intern or a non-permanent member for the secondary contact.
           </p>
       <TextField
           type="text"
           label="Secondary Contact Name"
           fullWidth
           defaultValue={secondaryContactName}
           margin="normal"
           className="mt-0 mb-2"
           disabled
       />


       <TextField
           type="text"
           label="Secondary Contact Number"
           fullWidth
           defaultValue={secondaryContactNumber}
           margin="normal"
           className="mt-0 mb-2"
           disabled
       />


       <TextField
           type="text"
           label="Secondary Email Address"
           fullWidth
           defaultValue={secondaryEmailAddress}
           margin="normal"
           className="mt-0 mb-2"
           disabled
       />

</div>
<div className="jr-card">
   <h3 className="mb-0">
           Online identities
       </h3>
       <TextField
           type="text"
           label="Startup Website"
           fullWidth
           defaultValue={startupWebsite}
           margin="normal"
           className="mt-0 mb-2"
           disabled
       />
</div>
<div className="jr-card">
   <h3 className="mb-0">
           Social media links ( Facebook, Twitter etc profiles) 
       </h3>
       {socialMediaLinks.map((f, i) => <div key={i}>
           <TextField
           type="text"
           label="Social media link"
           fullWidth
           defaultValue={f}
           margin="normal"
           className="mt-0 mb-2"
           disabled
            />
           </div>)}
</div>
<div className="jr-card">
   <h3 className="mb-0">
           Bank Details
       </h3>
       <p className="text-muted">

If your startup is not incorporated, please mention "Not incorporated" and if your startup is incorporated but does not have a bank account, please mention "No Bank Account"
           </p>
       <TextField
           type="text"
           label="Startup PAN"
           fullWidth
           defaultValue={startupPAN}
           margin="normal"
           className="mt-0 mb-2"
           disabled
       />


       <TextField
           type="text"
           label="Bank Account Number"
           fullWidth
           defaultValue={bankAccountNumber}
           margin="normal"
           className="mt-0 mb-2"
           disabled
       />


       <TextField
           type="text"
           label="Bank Name"
           fullWidth
           defaultValue={bankName}
           margin="normal"
           className="mt-0 mb-2"
           disabled
       />


       <TextField
           type="text"
           label="Bank IFSC"
           fullWidth
           defaultValue={bankIFSC}
           margin="normal"
           className="mt-0 mb-2"
           disabled
       />
</div>
<div className="jr-card  align-items-center">
   <h3 className="mb-0">
   Facilities Needed From GUSEC
       </h3>

           <FormGroup>
<FormControlLabel
control={
<Checkbox checked={facilitiesNeededFromGUSEC['mentorship']} value="mentorship" disabled />
}
label="Mentorship"
/>
<FormControlLabel
control={
<Checkbox checked={facilitiesNeededFromGUSEC['support_in_fundraising']} value="support_in_fundraising" disabled/>
}
label="Support in fundraising"
/>
<FormControlLabel
control={
<Checkbox checked={facilitiesNeededFromGUSEC['gusec_id_card']} value="gusec_id_card" disabled
/>
}
label="GUSEC ID card"
/>
<FormControlLabel
control={
<Checkbox checked={facilitiesNeededFromGUSEC['dedicated_silent_zone']} value="dedicated_silent_zone" disabled
/>
}
label="Dedicated quiet / silent zone"
/>
<FormControlLabel
control={
<Checkbox checked={facilitiesNeededFromGUSEC['desktop_computer_access']} value="desktop_computer_access" disabled
/>
}
label="Desktop computer access"
/>
<FormControlLabel
control={
<Checkbox checked={facilitiesNeededFromGUSEC['gusec_email_address']}  value="gusec_email_address" disabled
/>
}
label="A @gusec.edu.in email address"
/>
<FormControlLabel
control={
<Checkbox checked={facilitiesNeededFromGUSEC['coworking_access']}  value="coworking_access" disabled
/>
}
label="24x7 co-working access"
/>
</FormGroup>
<hr/>
<h3 className="mb-0">
GUSEC Premises Access
       </h3>
       <TextField
           type="text"
           value={gusecPremisesAccess}
           label="GUSEC Premises Access"
           fullWidth
           margin="dense"
           className="mt-0 mb-2"
           disabled
       /> 
           </div> 
   </form>
    )
  }
}