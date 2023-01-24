// https://roboticsbackend.com/arduino-create-library/


#ifndef AN_LOCAL
#define AN_LOCAL

namespace an_local{
	unsigned long four_byte_array_to_long(unsigned char* buffer, unsigned char bufferSize) {
		unsigned long uid = 0;

		for (short i = 0; i < bufferSize; i++) {
			if (i >= 4) break;  //longs are only 4 bytes big

			uid = uid << 8 | buffer[i];
		}

		return uid;
	}
}

#endif