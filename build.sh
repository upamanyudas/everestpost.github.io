#!/bin/bash

# Replace config values with environment variables if they exist
if [ ! -z "$HCAPTCHA_SITE_KEY" ]; then
  sed -i "s/hcaptcha_site_key: \".*\"/hcaptcha_site_key: \"$HCAPTCHA_SITE_KEY\"/" _config.yml
fi

if [ ! -z "$GOOGLE_MAPS_API_KEY" ]; then
  sed -i "s/google_maps_api_key: \".*\"/google_maps_api_key: \"$GOOGLE_MAPS_API_KEY\"/" _config.yml
fi

if [ ! -z "$TMDB_API_KEY" ]; then
  sed -i "s/tmdb_api_key: \".*\"/tmdb_api_key: \"$TMDB_API_KEY\"/" _config.yml
fi

if [ ! -z "$FORMSPREE_FORM_ID" ]; then
  sed -i "s/formspree_form_id: \".*\"/formspree_form_id: \"$FORMSPREE_FORM_ID\"/" _config.yml
fi

# Print confirmation of environment variables (without showing the actual values)
echo "Environment variables processed:"
if [ ! -z "$HCAPTCHA_SITE_KEY" ]; then echo "- HCAPTCHA_SITE_KEY"; fi
if [ ! -z "$GOOGLE_MAPS_API_KEY" ]; then echo "- GOOGLE_MAPS_API_KEY"; fi
if [ ! -z "$TMDB_API_KEY" ]; then echo "- TMDB_API_KEY"; fi
if [ ! -z "$FORMSPREE_FORM_ID" ]; then echo "- FORMSPREE_FORM_ID"; fi

# Build the site
echo "Building Jekyll site..."
bundle exec jekyll build
echo "Build completed."
