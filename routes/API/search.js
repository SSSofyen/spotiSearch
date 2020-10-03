const express = require('express')
const router = express.Router()
const SpotifyWebApi = require('spotify-web-api-node')
const config = require('config')

const spotifyApi = new SpotifyWebApi({
	clientId: config.get('CLIENT_ID'),
	clientSecret: config.get('CLIENT_SECRET')
})

spotifyApi
	.clientCredentialsGrant()
	.then((data) => spotifyApi.setAccessToken(data.body['access_token']))
	.catch((error) =>
		console.log('Something went wrong when retrieving an access token', error)
	)

// ARTISTS SEARCH ROUTE,
// RETURNS AN ARRAY OF OBJECTS WITH ARTIST AND ID
router.post('/', function (req, res) {
	spotifyApi
		.searchArtists(req.body.artistQuery)
		.then((data) => {
			const artistsTable = data.body.artists.items.map((entry) => {
				const id = entry.id
				const name = entry.name

				entry = { id, name }

				return entry
			})
			res.json(artistsTable)
		})
		.catch((err) =>
			console.log('This error occurred while searching artists: ', err)
		)
})

// ALBUM SEARCH ROUTE
router.post('/albums', async (req, res) => {
	spotifyApi
		.getArtistAlbums(req.body.artistId)
		.then((data) => {
			const albumTable = data.body.items.map((entry) => {
				const id = entry.id
				const name = entry.name

				entry = { id, name }

				return entry
			})
			res.json(albumTable)
		})
		.catch((err) =>
			console.log('This error occurred while searching albums: ', err)
		)
})

// TRACK SEARCH ROUTE
// use .getAlbumTracks()
router.post('/tracks', async (req, res) => {
	spotifyApi
		.getAlbumTracks(req.body.albumId)
		.then((data) => {
			const tracksTable = data.body.items.map((entry) => {
				const id = entry.id
				const name = entry.name

				entry = { id, name }

				return entry
			})
			res.json(tracksTable)
		})
		.catch((err) =>
			console.log('This error occurred while searching albums: ', err)
		)
})

module.exports = router
