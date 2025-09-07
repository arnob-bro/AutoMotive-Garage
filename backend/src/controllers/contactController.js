class ContactController {
    constructor(contactService) {
      this.contactService = contactService;
  
      // Bind methods so 'this' works in routes
      this.makeInquiry = this.makeInquiry.bind(this);
      this.replyToInquiry = this.replyToInquiry.bind(this);
      
    }
  
    async makeInquiry(req, res) {
      try {
        const {name,email, phone, subject, message} = req.body;
        
        
        // check if all fields are provided
        if (!name || !email || !phone  || !subject || !message) {
          return res.status(400).json({error: "All fields are required"});
        }
        
        // check if email is a valid email
        if (!/^(?!.*\.\.)(?!.*\.$)[^\W][\w.+-]{0,63}@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(email)) {
          return res.status(400).json({ error: "Invalid email" });
        }
        
        // check if name is a valid name
        if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(name)) {
          return res.status(400).json({ error: "Invalid name" });
        }
        
        if (phone && (phone.length > 20 || phone.length < 6 )) {
            return res
              .status(400)
              .json({ error: "Phone number too long (max 20 chars) or too short (min 6 chars)" });
          }
        
        const inquiry = await this.contactService.makeInquiry(name,email, phone, subject, message);
        res.status(201).json({success: true, message: "User created successfully", data: inquiry});
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    }

    async replyToInquiry(req,res) {
        try{
            const {contactform_id} = req.params;
            const {replyMessage} = req.body;

            const reply = await this.contactService.replyToInquiry(contactform_id,replyMessage);
            res.status(200).json({success: true});
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

    
      
}
  
  module.exports = ContactController;
  