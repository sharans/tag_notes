# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_tag_notes_session',
  :secret      => 'db89838b5b6564b514acdfa0d0ebcfd563b2823e12e683af55063fc054aa3d683b0517299a3d45f72eb5beca11045750551caa3fde19342407388e14a7046b09'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
