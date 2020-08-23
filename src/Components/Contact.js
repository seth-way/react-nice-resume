import React, { Component } from 'react';
import emailjs from "emailjs-com";


class Contact extends Component {
   constructor(props) {
      super(props);

      this.state = { 
         formSubmitted: false,
         contactName: '',
         contactEmail: '',
         contactSubject: '',
         contactMessage: '',
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(event) {
      const { name, value } = event.target;
      this.setState({ [name]: value });
      event.preventDefault();
   }

   handleSubmit(event) {
      const service_id = "default_service";
      const template_id = "contact_us";
      const {contactName, contactEmail, contactSubject, contactMessage} = this.state;

      var params = {
         "contactName": contactName,
         "contactEmail": contactEmail,
         "contactSubject": contactSubject,
         "contactMessage": contactMessage,
      };

      emailjs.send(service_id, template_id, params)
  	      .then(() => { 
            this.setState({formSubmitted: true});
         }, function(err) {
            alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));

         });

      event.preventDefault();
   }

   componentDidMount() {
      emailjs.init("user_pB5iiwdQB3NQx9EcvTMPY");
   }

  render() {

    if(this.props.data){
      var name = this.props.data.name;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone= this.props.data.phone;
      var email = this.props.data.email;
      var message = this.props.data.contactmessage;
    }

    const { formSubmitted } = this.state;

    const renderFormSubmitted = () => (
       <section>
         <div className="row banner banner-text">
            <h3>Thank you for reaching out! I do my best to read and respond to email submissions as quickly as possible.</h3>
         </div>
       </section>
    );

    const renderForm = () => (
      <section id="contact">

         <div className="row section-head">

            <div className="two columns header-col">

               <h1><span>Get In Touch.</span></h1>

            </div>

            <div className="ten columns">

                  <p className="lead">{message}</p>

            </div>

         </div>

         <div className="row">
            <div className="eight columns">

               <form action="" method="post" id="contactForm" name="contactForm" onSubmit={this.handleSubmit}>
					<fieldset>

                  <div>
						   <label htmlFor="contactName">Name <span className="required">*</span></label>
						   <input type="text" defaultValue="" size="35" id="contactName" name="contactName" onChange={this.handleChange}/>
                  </div>

                  <div>
						   <label htmlFor="contactEmail">Email <span className="required">*</span></label>
						   <input type="text" defaultValue="" size="35" id="contactEmail" name="contactEmail" onChange={this.handleChange}/>
                  </div>

                  <div>
						   <label htmlFor="contactSubject">Subject</label>
						   <input type="text" defaultValue="" size="35" id="contactSubject" name="contactSubject" onChange={this.handleChange}/>
                  </div>

                  <div>
                     <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                     <textarea cols="50" rows="15" id="contactMessage" name="contactMessage" onChange={this.handleChange}></textarea>
                  </div>

                  <div>
                     <button className="submit">Submit</button>
                     <span id="image-loader">
                        <img alt="" src="images/loader.gif" />
                     </span>
                  </div>
					</fieldset>
				   </form>

           <div id="message-warning"> Error boy</div>
				   <div id="message-success">
                  <i className="fa fa-check"></i>Your message was sent, thank you!<br />
				   </div>
           </div>


            <aside className="four columns footer-widgets">
               <div className="widget widget_contact">

					   <h4>Address and Phone</h4>
					   <p className="address">
						   {name}<br />
						   {street} <br />
						   {city}, {state} {zip}<br />
						   <span>{phone}</span>
					   </p>
				   </div>
               {/*
               <div className="widget widget_tweets">
                  <h4 className="widget-title">Latest Tweets</h4>
                  <ul id="twitter">
                     <li>
                        <span>
                        This is Photoshop's version  of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet.
                        Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum
                        <a href="#">http://t.co/CGIrdxIlI3</a>
                        </span>
                        <b><a href="#">2 Days Ago</a></b>
                     </li>
                     <li>
                        <span>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                        eaque ipsa quae ab illo inventore veritatis et quasi
                        <a href="#">http://t.co/CGIrdxIlI3</a>
                        </span>
                        <b><a href="#">3 Days Ago</a></b>
                     </li>
                  </ul>
               </div>
               */}
            </aside>
      </div>
   </section>
    );
    
   return (
     <section id="contact">
       {formSubmitted ?  renderFormSubmitted() : renderForm()}
      </section>
   );
  }
}

export default Contact;
