import cloudinary, {
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';

/**
 * Uploads a file to Cloudinary.
 *
 * @param file - The file to be uploaded.
 * @param public_id - The public ID of the uploaded file.
 * @param overwrite - Whether to overwrite an existing file with the same public ID.
 * @param invalidate - Whether to invalidate the CDN cache for the uploaded file.
 * @returns A promise that resolves to the upload response or an error response.
 */
export function uploads(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        public_id,
        overwrite,
        invalidate,
        resource_type: 'auto',
      },
      (
        error: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined
      ) => {
        if (error) resolve(error);
        resolve(result);
      }
    );
  });
}
